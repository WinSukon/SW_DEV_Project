export default function genid(){
    return Date.now().toString(36) + Math.random().toString(36);
}