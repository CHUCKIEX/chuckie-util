(function (window) {
	const util = () => {
		/**
		 * 返回变量类型
		 * @method typeOf
		 * @for util
		 * @param {*} str
		 * @return {string} number string boolean array object function null undefined
		 */
		const typeOf = str => {
			if (str === null) {
				return null
			} else if (typeof str === 'object') {
				if (str && str.constructor === Array) {
					return 'array'
				}
				if (str && str.constructor === Object) {
					return 'object'
				}
			} else {
				return typeof str
			}
		}

		/**
		 * 判断是否为空
		 * @method isEmpty
		 * @for util
		 * @param {*} str 
		 * @return {boolean} number string boolean array object function null undefined
		 */
		const isEmpty = str => {
			if (
				Object.prototype.toString.call(str) === "[object Undefined]" ||
				Object.prototype.toString.call(str) === "[object Null]"
			) {
				return true
			} else {
				if (
					Object.prototype.toString.call(str) === "[object String]" ||
					Object.prototype.toString.call(str) === "[object Array]"
				) {
					return str.length === 0 ? true : false
				}
				if (Object.prototype.toString.call(str) === "[object Object]") {
					return JSON.stringify(str) === "{}" ? true : false
				}
				if (Object.prototype.toString.call(str) === "[object Number]") {
					return str === 0 ? true : false
				}
				if (Object.prototype.toString.call(str) === "[object Function]") {
					return false
				}
				if (Object.prototype.toString.call(str) === "[object Boolean]") {
					return str
				}
			}
		}

		/**
		 * 请求API
		 * @param {*} parameter 
		 */
		const ajax = parameter => {
			if (!parameter || parameter == {} || !parameter.url) {
				// toast('Invalid URL')
				console.log("Data request can not be executed without URL.")
				return false
			}
			// showLoading('加载中')
			$.ajax({
				type: parameter.type || "POST",
				async: parameter.async || true,
				url: parameter.url,
				data: parameter.data || {},
				dataType: "json",
				contentType: "application/x-www-form-urlencoded",
				// contentType: "application/json",
				beforeSend: () => {
					console.log("Loading show ...")
					if (typeof parameter.beforeSend === "function") {
						parameter.beforeSend && parameter.beforeSend(response)
					} else {
						// console.log('Loading show ...')
					}
				},
				success: response => {
					if (typeof parameter.success === "function") {
						parameter.success && parameter.success(response)
					}
				},
				error: error => {
					if (typeof parameter.error === "function") {
						toast("Bad Request")
						parameter.error && parameter.error(error)
					} else {
						console.log(error)
					}
				},
				complete: () => {
					console.log("Loading hide ...")
					if (typeof parameter.complete === "function") {
						parameter.complete && parameter.complete()
					} else {}
				}
			})
		}

		return {
			typeOf: typeOf,
			fetch: fetch,
			isEmpty: isEmpty
		}
	}

	window.util = util()
})(window)