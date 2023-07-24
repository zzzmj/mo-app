const fetcher = async (url: any) => {
    const res = await fetch(url);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
    if (json.status !== 200) {
        throw new Error(json.message);
    }
    return json.data;
};

export default fetcher