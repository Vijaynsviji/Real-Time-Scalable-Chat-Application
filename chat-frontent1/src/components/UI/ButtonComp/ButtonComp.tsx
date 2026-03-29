import CircularProgress from "@mui/material/CircularProgress"

export interface ButtonCompProps{
    name:string,
    fontSize?: string,
    isLoading?:boolean,
    handleSubmit?: ()=>void
}




export default function ButtonComp({name,fontSize,isLoading=false,handleSubmit}:ButtonCompProps){
    return <button onClick={handleSubmit} className={`md:text-${fontSize || "2xl"} text:xl font-bold rounded-[10px] text-[var(--primary-button-text)] p-[20px] bg-[var(--bg-primary-button)]`}>
        {isLoading ? <CircularProgress style={{color: "var(--input-bg)"}} enableTrackSlot size={40} /> :name}
    </button>
}