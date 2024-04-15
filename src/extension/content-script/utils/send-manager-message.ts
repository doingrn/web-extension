const port = chrome.runtime.connect({ name: 'doingrn' });

export function sendManagerMessage(data: unknown) {
  port.postMessage(data);
}
