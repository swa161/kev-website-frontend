import axios from "axios"
import { useState, useEffect } from "react" 

type FullNameResponse = {
    fullName: string
}


export function Header() {
    const [name, setName] = useState<FullNameResponse|null>(null)
    useEffect(() => {
        const fetchFullName = async () => {
            const response = await axios.get<FullNameResponse>('/api/v1/users/1/name')
            setName(response.data)
        }
        fetchFullName()
    }, [])


    return (
        <div className="header">
            <div className="fullname-section">
                {name?.fullName}
            </div>
            
            <div className="right-section">
                <a href="#home">Home</a>
                <a href="#about">About me</a>
                <a href="#skills">Skills</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
            </div>
        </div>
    )
}