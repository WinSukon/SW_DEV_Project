import Banner from "@/components/Banner";
import Menus from "@/components/Menus";

export default function Home() {
  return (
    <main className="flex flex-row  min-h-screen">
      <Menus></Menus>
      <Banner></Banner>
    </main>
  )
}
