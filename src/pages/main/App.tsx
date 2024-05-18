import ResizablePane from "../../components/ResizablePanel/ResizablePane";
import DirectoryPanel from "../../components/Directory/DirectoryPanel";

export default function App() {
  const isVertical = false

  return (
    <div
      className={`w-screen h-screen flex ${
        isVertical ? "flex-col" : "flex-row"
      }`}
    >
      <ResizablePane
        minSize={150}
        initialSize={200}
        maxSize={300}
        isVertical={isVertical}
        bgColor={"bg-[#383838]"}
      >
        <DirectoryPanel />
      </ResizablePane>
      <ResizablePane
        minSize={150}
        initialSize={300}
        grow={true}
        isVertical={isVertical}
        bgColor={"bg-[#282828]"}
      >
        <header>
          <h1 className="text-2xl font-bold text-center">Resizable Panel</h1>
        </header>
        <main>
          <div className="flex items-center justify-center h-full">
            Pane 2
          </div>
        </main>
        <footer>
          <p className="text-center">Resizable Pane Footer</p>
        </footer>
      </ResizablePane>
    </div>
  );
}
