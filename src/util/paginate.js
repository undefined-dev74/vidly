import _ from 'lodash'

export function paginate(items, pageNumber, pageSize) {
    const startIdx = (pageNumber - 1) * pageSize;
    return _(items)
    .slice(startIdx)
    .take(pageSize)
    .value();
}