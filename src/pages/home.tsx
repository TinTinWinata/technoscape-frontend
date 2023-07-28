import { useUserAuth } from "../hooks/user-context";

export default function Home() {
    const { user } = useUserAuth();

    console.log(user);

    return (
        <div>
            <div>
                Welcome {user?.first_name} {user?.last_name}
            </div>
        </div>
    );
}
