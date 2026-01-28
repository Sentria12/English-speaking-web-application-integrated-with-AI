// src/types/recorder-js.d.ts
declare module "recorder-js" {
  class Recorder {
    constructor(stream: MediaStream);
    start(): Promise<void>;
    stop(): Promise<{ blob: Blob }>;
  }
  export = Recorder;
}
