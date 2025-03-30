"use client";

import { useAuth } from "@/hooks/useAuth";

export default function Home() {
	const { user } = useAuth();
	return (
		<div>
			{user ? (
				<div>Welcome, {user.name}</div>
			) : (
				<div>Please login</div>
			)}
			hello
		</div>
	);
}
