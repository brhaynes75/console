import os from 'os';
import { spawn } from 'child_process';

export function setupTerminal(socket) {
  const shell = os.platform() === 'win32' ? 'powershell.exe' : process.env.SHELL || 'zsh';
  
  // Spawn shell process
  const shellProcess = spawn(shell, [], {
    cwd: process.env.HOME,
    env: { ...process.env, TERM: 'xterm-color' }
  });

  // Send terminal output to client
  shellProcess.stdout.on('data', (data) => {
    socket.emit('terminal:data', data.toString());
  });

  shellProcess.stderr.on('data', (data) => {
    socket.emit('terminal:data', data.toString());
  });

  shellProcess.on('exit', (code) => {
    socket.emit('terminal:data', `\r\n[Process exited with code ${code}]\r\n`);
  });

  // Receive input from client
  socket.on('terminal:input', (data) => {
    shellProcess.stdin.write(data);
  });

  // Handle resize (no-op for now since we're using plain child_process)
  socket.on('terminal:resize', ({ cols, rows }) => {
    // Child_process doesn't support resize, but we keep the handler for compatibility
  });

  // Cleanup on disconnect
  socket.on('disconnect', () => {
    shellProcess.kill();
    console.log('Client disconnected');
  });
}

