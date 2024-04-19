exports.paginateResults = (page, pageSize, data) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const results = {};

    if (endIndex < data.length) {
        results.next = {
            page: page + 1,
            pageSize: pageSize
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            pageSize: pageSize
        };
    }

    results.results = data.slice(startIndex, endIndex);

    return results;
};
