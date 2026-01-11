
import type { HeroProps } from "../types/user"

export function LoggedInPage({ user }: HeroProps) {
    const full_name = `${user?.first_name} ${user?.last_name}`
    return (
        <div className="Logged-in-container">
            {full_name}
        </div>
    )
}