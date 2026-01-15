import { auth } from "@/auth";

export default async function TestSessionPage() {
  const session = await auth();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 ">

        <pre>
      {JSON.stringify(session, null, 2)}
    </pre> 
    </div>
   
  );
}
