import React from "react";
import { useController, Control } from "react-hook-form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { AddPersonFormValues } from "@/app/[locale]/add-martyrs/_hooks/useAddPersonForm";

interface Category {
  name: string;
  tags: Record<string, string>;
}

interface TagInputProps {
  categories: Category[];
  placeholder?: string;
  maxHeight?: string;
  control: Control<AddPersonFormValues>;
  name: "interestsAndHobbies";
}

const TagInput: React.FC<TagInputProps> = ({
  categories,
  placeholder = "Type a category or tag...",
  maxHeight = "300px",
  control,
  name,
}) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const interests = categories
    .map((category) => ({
      name: category.name,
      tags: Object.keys(category.tags),
    }))
    .flat();

  const [inputValue, setInputValue] = React.useState<string>("");

  const totalTags = value?.reduce((acc, cat) => acc + cat.tags.length, 0);

  const addTag = (categoryName: string, tag: string) => {
    const updatedValue = value?.map((category) =>
      category.category === categoryName
        ? { ...category, tags: [...category.tags, tag] }
        : category,
    );
    if (!updatedValue?.some((category) => category.category === categoryName)) {
      updatedValue?.push({ category: categoryName, tags: [tag] });
    }
    onChange(updatedValue);
    setInputValue("");
  };

  const removeTag = (categoryName: string, tagToRemove: string) => {
    const updatedValue = value
      ?.map((category) =>
        category.category === categoryName
          ? {
              ...category,
              tags: category.tags.filter((tag) => tag !== tagToRemove),
            }
          : category,
      )
      .filter((category) => category.tags.length > 0);
    onChange(updatedValue);
  };

  const filteredCategories = interests
    .map((category) => ({
      ...category,
      tags: category.tags.filter(
        (tag) =>
          tag.toLowerCase().includes(inputValue.toLowerCase()) &&
          !value?.find((c) => c.category === category.name)?.tags.includes(tag),
      ),
    }))
    .filter((category) => category.tags.length > 0);

  return (
    <div className="w-full max-w-md">
      {totalTags! > 0 && (
        <ScrollArea className="overflow-y -scroll mb-2 max-h-64 min-h-fit w-full whitespace-nowrap rounded-md border">
          <div className="p-2">
            {value?.map(
              (category) =>
                category.tags.length > 0 && (
                  <div key={category.category} className="mb-4">
                    <h3 className="mb-2 text-lg font-semibold">
                      {category.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-sm font-normal"
                        >
                          {
                            categories.find((c) => c.name === category.category)
                              ?.tags[tag]
                          }
                          <button
                            onClick={() => removeTag(category.category, tag)}
                            className="ml-1"
                          >
                            <X size={14} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                ),
            )}
          </div>
        </ScrollArea>
      )}
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
        />
        <CommandList>
          <CommandEmpty>No suggestions found.</CommandEmpty>
          <ScrollArea className={`min-h-[${maxHeight}]`}>
            {filteredCategories.map((category) => (
              <CommandGroup key={category.name} heading={category.name}>
                {category.tags.map((tag) => (
                  <CommandItem
                    key={tag}
                    onSelect={() => addTag(category.name, tag)}
                    className="cursor-pointer"
                  >
                    {
                      categories.find((c) => c.name === category.name)?.tags[
                        tag
                      ]
                    }
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </ScrollArea>
        </CommandList>
      </Command>
    </div>
  );
};

export default TagInput;
