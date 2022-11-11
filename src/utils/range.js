export function range(limit, start = 0) {
	return Array(limit)
		.fill('')
		.map((_, i) => i + start);
}
