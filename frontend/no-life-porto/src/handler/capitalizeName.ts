export default function capitalizeName(name: string) {
    let format;
    const formatCreator = name.slice(0, 1).toUpperCase();
    const rest = name.substring(
        1,
        name.length - 1 + 1
    );
    format = formatCreator + rest;


    return format
}