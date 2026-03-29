import type { handleChangeType } from "../../auth/authbase";



export interface InputCompProps{
    label?: string,
    inputType: React.HTMLInputTypeAttribute | undefined,
    placeHolder?: string
    hideLable?:boolean,
    labelSize?: string,
    handleChange: (value:string,  type?: handleChangeType)=>void
    type?:handleChangeType,
    value: string,
}



export default function InputComp({label,inputType,placeHolder,hideLable=true,labelSize,handleChange,type,value}:InputCompProps) {
    let classNames = "flex flex-col align-center";
    if(!hideLable){
        classNames = "flex flex-col gap-[10px] align-center";
    }
    return (
        <div className={classNames}>
            {!hideLable && <p className={`md:text-3xl text-lg  text-[var(--primary-text)]  `}>{label}</p>}
            <input value={value} onChange={(e)=>handleChange(e.target.value,type)} placeholder={placeHolder ?? ""} className="bg-[var(--input-bg)] text-sm md:text-xl border border-[var(--input-border)] text-[var(--primary-text)] p-[10px] border-solid rounded-[10px] h-[60px]" type={inputType} />
        </div>
    );
}
