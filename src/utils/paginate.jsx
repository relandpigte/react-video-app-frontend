import _ from 'lodash'

export function Paginate(data, currentPage, pageSize) {
  const start = (currentPage - 1) * pageSize
  return _(data).slice(start).take(pageSize).value()
}
