const search = (query: string) => {
    // tslint:disable-next-line: no-console
    console.log(`The search API has been called. Query: ${query}`);
    return query
}

export { search as searchAPI};