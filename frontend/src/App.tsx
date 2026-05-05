import PlusIcon from "./components/icons/PlusIcon"
import ShareIcon from "./components/icons/ShareIcon"
import Button from "./components/ui/Button"


function App() {


  return (
    <>
      <Button variants="secondary" size="lg" title="add Content" starticon={<PlusIcon size="lg" />} />

      <Button variants="primary" size="md" title="Share" starticon={<ShareIcon size="md" />} />

      <Button variants="primary" size="sm" title="Share" starticon={<ShareIcon size="sm" />} />
    </>
  )
}

export default App
