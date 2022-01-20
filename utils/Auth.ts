import { supabase } from "./supabaseClient"
import { useState, useEffect } from 'react'
import { AuthChangeEvent, Session } from "@supabase/supabase-js"

const Auth = () => {
	const [session, setSession] = useState<Session | null>()

	const setServerSession = async (event: AuthChangeEvent, session: Session | null) => fetch('/api/auth', {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json'}),
		credentials: 'same-origin',
		body: JSON.stringify({ event, session })
	}).then((res) => res.json())

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange(
			async (event, session) => {
				const user = session?.user! ?? null
				await setServerSession(event, session)
				setSession(session)
				// if (session === '') setAuthenticatedState(variables.Authenticated)
				// if (event === 'SIGNED_OUT') setAuthenticatedState(variables.Not_authenticated)
			})

		return () => authListener?.unsubscribe()
	}, [])
	return { session }
}

export default Auth
