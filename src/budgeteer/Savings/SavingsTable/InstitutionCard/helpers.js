 export function determineNewWidth(institutionNameRef) {
	const width = institutionNameRef.current ? institutionNameRef.current.offsetWidth : 0;
	return width;
}
