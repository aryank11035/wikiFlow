import { useEffect , useState } from "react";

export const BackendMessage = () => {

    const [message , setMessage] = useState<string>('')

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/message')
                const data = await res.json()
                setMessage(data.message)
            } catch (error) {
                console.log(error)
                setMessage('failed to fetch message')
            }
        }

        fetchMessage()
    },[])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">
                {message}
            </h1>
        </div>
    )

}