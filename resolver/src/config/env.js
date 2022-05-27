const { env: { PORT, ROOT_BASE_URL, TLD_BASE_URL } } = process;

module.exports = {
    port: PORT,
    rootBaseUrl: ROOT_BASE_URL,
    TLDBaseUrl: TLD_BASE_URL
}