export default function Page({ params }: { params: { id: number } }) {
    return <div className="bg-white px-4 pb-4 rounded shadow-md col-span-2">My Article {params.id}</div>
  }