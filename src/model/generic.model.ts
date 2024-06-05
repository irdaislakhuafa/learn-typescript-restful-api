export type Response<T> = {
	paging?: {
		current_page: number,
		total: number,
		size: number,
	}
	data?: T
	errors?: [Error]
}