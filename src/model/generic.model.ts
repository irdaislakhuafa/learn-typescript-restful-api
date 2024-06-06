export type ResponseData<T> = {
	paging?: {
		current_page: number,
		total: number,
		size: number,
	}
	data?: T
	errors?: [Error]
}