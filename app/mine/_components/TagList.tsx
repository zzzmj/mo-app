import useUserId from "@/hooks/useUserId";
import cn from "@/lib/cn";
import fetcher from "@/lib/fetcher";
import { useState } from "react";
import useSWR from "swr";

interface TagListProps {
    onSelectTag: (categoryId: string) => void;
}

const TagList = ({ onSelectTag }: TagListProps) => {
    const userId = useUserId();
    const {
        isLoading,
        data: categoryData,
        error,
    } = useSWR(userId ? `/api/category/tiny?userId=${userId}` : "", fetcher);
    const [selectId, setSelectId] = useState("");

    return (
        <div className="category">
            {categoryData &&
                categoryData.map((item: any) => {
                    const listItemCls = cn(
                        "flex items-center px-4 rounded-md h-10 leading-10 cursor-pointer transition",
                        {
                            "bg-green-500 text-white": selectId === item.id,
                            "hover:bg-gray-100": selectId !== item.id,
                        }
                    );
                    return (
                        <div
                            onClick={() => {
                                setSelectId(item.id);
                                onSelectTag(item.id);
                            }}
                            key={item.id}
                            className={listItemCls}
                        >
                            # {item.name} ({item.count})
                        </div>
                    );
                })}
        </div>
    );
};

export default TagList;
