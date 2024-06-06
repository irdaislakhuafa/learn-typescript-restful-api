export class ResponseError extends Error {
	public readonly func: string = "";
	public readonly line: string = "";
	public readonly file: string = "";
	public readonly column: string = "";

	constructor(
		public code: number,
		public message: string,
		opt?: ErrorOptions,
	) {
		super(message, opt)


		const stack = this.stack
		if (stack) {
			// Stack trace lines differ between environments; adjust the following to your needs
			const stackLines = stack.split('\n')

			// Typically, the third line in the stack trace contains the caller information
			// stackLines[0] is "Error"
			// stackLines[1] is the current function (getCallerInfo)
			// stackLines[2] is the caller function
			const callerLine = stackLines[2]
			const callerInfo = callerLine.trim().match(/at (.+) \((.+):(\d+):(\d+)\)/)
			if (callerInfo) {
				const caller = {
					func: callerInfo[1],
					filePath: callerInfo[2],
					line: callerInfo[3],
					column: callerInfo[4],
				}

				this.file = caller.filePath
				this.line = caller.line
				this.column = caller.column
				this.func = caller.func + "()"
			}
		}
	}
}