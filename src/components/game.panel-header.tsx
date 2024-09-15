export function GamePanelHeader({
  onFullScreen,
}: {
  onFullScreen: () => void;
}) {
  return (
    <header className="flex h-[2.1rem] justify-between items-center text-[#d5b577] px-2.5">
      <h1 className="text-xl font-medium">Keno 4 min vs1</h1>
      <div
        className="group cursor-pointer flex gap-2 items-center"
        title="Перезагрузить игру"
      >
        <span className="text-xs group-hover:text-white">
          Вы играете на демо счёт
        </span>
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 16.508 16.668"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <path
            fill="#D5B577"
            d="M15.758 1.627a.75.75 0 0 0-.75.75v.979A8.31 8.31 0 0 0 8.333 0C3.738 0-.001 3.739-.001 8.334c0 4.596 3.739 8.334 8.334 8.334a8.332 8.332 0 0 0 7.651-5.027.75.75 0 0 0-1.377-.595 6.831 6.831 0 0 1-6.274 4.123 6.841 6.841 0 0 1-6.834-6.834 6.842 6.842 0 0 1 6.834-6.834 6.81 6.81 0 0 1 5.674 3.044H12.8a.75.75 0 0 0 0 1.5h2.958a.75.75 0 0 0 .75-.75V2.377a.75.75 0 0 0-.75-.75z"
          ></path>
        </svg>
      </div>
      <div className="flex gap-3">
        <div className="h-5 w-5 cursor-pointer">
          <div title="Открыть на полный экран" onClick={onFullScreen}>
            <svg
              viewBox="62.521 63.146 17.095 17.094"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
            >
              <path
                fill="#D5B577"
                d="M63.938 68.693v-4.121h14.229v14.23h-3.673v1.351h3.847c.648 0 1.177-.527 1.177-1.176V64.399c0-.648-.527-1.177-1.177-1.177H63.765a1.18 1.18 0 0 0-1.178 1.177v4.294h1.351z"
              ></path>
              <path
                fill="#D5B577"
                d="M71.59 70.927h-8.436a.568.568 0 0 0-.566.567v8.089a.57.57 0 0 0 .566.568h8.436a.568.568 0 0 0 .566-.568v-8.089a.568.568 0 0 0-.566-.567zm-.817 8.014H63.97v-6.803h6.803v6.803z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="h-5 w-5 cursor-pointer" title="Растянуть на весь экран">
          <svg
            className="game-panel__header__controls__icon svg-col-mid"
            viewBox="62.24 63.24 17.125 17.109"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            <path
              fill="#D5B577"
              d="M78.562 63.917a.758.758 0 0 0-.509-.211h-3.39a.548.548 0 0 0-.546.548v.187c0 .302.245.548.546.548h1.966l-6.381 6.371a.55.55 0 0 0 .001.772l.138.136a.539.539 0 0 0 .384.155.56.56 0 0 0 .387-.159l6.377-6.371v1.752c0 .302.246.547.548.547h.187a.548.548 0 0 0 .548-.547V64.47a.81.81 0 0 0-.256-.553z"
            ></path>
            <path
              fill="#D5B577"
              d="M77.933 71.554v7.365h-14.23v-14.23h7.365v-1.351h-7.539c-.648 0-1.176.527-1.176 1.177v14.576a1.18 1.18 0 0 0 1.176 1.179h14.576a1.18 1.18 0 0 0 1.177-1.179v-7.537h-1.349z"
            ></path>
          </svg>
        </div>
        <a
          href="https://bet1000.de/home/games/all"
          className="h-5 w-5 cursor-pointer"
          title="Закрыть"
        >
          <svg
            viewBox="63.021 63.412 16.797 16.796"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            <path
              fill="#D5B577"
              d="M72.49 71.818l7.173-7.172a.284.284 0 0 0 0-.4l-.678-.678a.284.284 0 0 0-.4 0l-7.173 7.172-7.138-7.137a.334.334 0 0 0-.47 0l-.609.608a.334.334 0 0 0 0 .47l7.139 7.138-7.173 7.171a.284.284 0 0 0 0 .4l.678.678c.11.111.29.111.4 0l7.173-7.172 7.139 7.139c.13.129.341.129.47 0l.608-.609a.333.333 0 0 0 0-.469l-7.139-7.139z"
            ></path>
          </svg>
        </a>
      </div>
    </header>
  );
}
