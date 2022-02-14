import { useEffect } from "react";

function useOnClickOutside(ref: any, ref2: any, handler: (arg0: any) => void) {
	useEffect(
		() => {
			const listener = (event: any) => {
				if (!ref.current || ref.current.contains(event.target) || !ref2.current || ref2.current.contains(event.target)) {
					return;
				}
				handler(event);
			};
			document.addEventListener("mousedown", listener);
			document.addEventListener("touchstart", listener);
			return () => {
				document.removeEventListener("mousedown", listener);
				document.removeEventListener("touchstart", listener);
			};
		},
		[ref, handler]
	);
}

export default useOnClickOutside