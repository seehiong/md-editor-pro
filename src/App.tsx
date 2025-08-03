import MarkdownEditor from './components/MarkdownEditor';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="container mx-auto py-8">
        <MarkdownEditor />
      </div>
    </div>
  );
}

export default App;