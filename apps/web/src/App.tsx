import { PageHeader } from "./components";
import { Uploader } from "./modules/upload";

function App() {
  return (
    <div className="m-20">
      <PageHeader
        className="mb-10"
        title="File Uploader"
        description="Get started uploading your files."
      />
      <Uploader />
    </div>
  );
}

export default App;
