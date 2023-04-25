/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FILTER_OPEN_ON_START: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}