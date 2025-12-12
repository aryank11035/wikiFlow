import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaWikipediaW } from "react-icons/fa";
import { useNodeAction } from "../../helpers/create-node";

export const MenuPanel = ({handleMainPage} : {handleMainPage : () => void}) => {
    return (
        <>
            <div className="w-fit h-fit flex gap-2">


            <div className='h-fit w-fit border border-neutral-300 rounded-sm inset-shadow-sm  inset-shadow-neutral-300/80 backdrop-blur-2xl flex items-center p-2 px-4 gap-4'>
                <div className="h-full  flex items-center justify-center">
                    <img src="/Logo.svg" alt="logo" className="size-10"/>
                </div>
                <div className="h-full flex items-center jusifty-center text-neutral-600 hover:text-black duration-200 cursor-pointer " onClick={handleMainPage}>
                    <FaWikipediaW className="size-10  "/>
                </div>
                {/* <div>
                    <Search className="size-10 text-neutral-600" strokeWidth={1.1}/>
                </div> */}
            </div>
{/*         
                    <div className='h-15 w-50  border border-neutral-300 rounded-sm inset-shadow-sm  inset-shadow-neutral-300/80 backdrop-blur-2xl'>
                    
                              </div> */}

            </div>

        </>
    )
}


export const SearchPanel = () => {

    const [search , setSearch] = useState<string>('')
    const [searchedTitle , setSearchedTitle] = useState<any | undefined>()

    const { createNewNode } = useNodeAction()

    useEffect(() => {
    if (search.trim().length < 2) {
      setSearchedTitle(undefined);
      return;
    }

    const handler = setTimeout(async () => {
      

      try {
        const response = await fetch(
          `https://api.wikimedia.org/core/v1/wikipedia/en/search/title?q=${search}&limit=10`,
         
        );

        if (!response.ok) return;
        const json = await response.json();
        setSearchedTitle(json.pages ?? undefined);
      } catch (_) {}
    }, 100);

    return () => clearTimeout(handler);
  }, [search]);


    const onTitleClick = (title : string ) => {
        setSearch('')
        setSearchedTitle(undefined)
        createNewNode(`title-${title.replace(/\s+/g, '-')}-${Date.now()}` , {x : 600 , y :100} , title , 'titlePageNode' , title)
    }

    return  (
        <>
            <div className='h-fit w-140  border border-neutral-300 rounded-sm inset-shadow-sm  inset-shadow-neutral-300/80 backdrop-blur-2xl relative flex items-center px-2 py-2  justify-between'>    
                <input className='absolute inset-0 outline-none px-10  font-light' placeholder="Search Wikipedia..." onChange={(e) => setSearch(e.target.value)} value={search}/>
                <Search className="size-6 text-neutral-300" strokeWidth={1.1}/>
                {
                    searchedTitle && (
                        <X className="size-6 text-neutral-300 cursor-pointer hover:text-neutral-500  duration-200 z-20" strokeWidth={1.1} onClick={() => setSearchedTitle(undefined)}/>
                    )
                }
            </div>
            
            {
                searchedTitle && (
                <div className='h-70 overflow-y-auto w-140  border border-neutral-300 rounded-sm inset-shadow-sm  inset-shadow-neutral-300/80 backdrop-blur-xl relative flex items-center px-2 py-2 mt-7 flex-col'> 
                    {
                        
                        searchedTitle.map(({title , description} : { title : string , description : string}) => (
                            <button className="flex flex-col w-full py-2 cursor-pointer px-2 hover:bg-white/30 rounded-sm duration-200 active:scale-98" key={title} onClick={() => onTitleClick(title)}>
                                <h1 className="text-xl text-left w-full font-semibold">{title}</h1>
                                <p className="text-neutral-500 text-sm text-left">{description}</p>
                                <div className="w-full  border-t border-t-neutral-400 mt-3 "></div>
                            </button>
                        ))
                    }
                </div>
                )
            }
        </>
    )
}