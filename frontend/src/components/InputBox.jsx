export const InputBox=({label,placeholder,onChange})=>{
    return <div>
        <div className="text-sm font-medium text-left py-2">
            {label} 
        </div>
        <input placeholder={placeholder} onChange={onchange} className="bg-white border border-neutral-200 rounded-md w-full hover:border-neutral-400 px-2 py-2"></input>
    </div>

}