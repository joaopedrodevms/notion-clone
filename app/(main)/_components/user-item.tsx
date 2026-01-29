"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { ChevronsUpDownIcon, LogOutIcon } from "lucide-react";

export const UserItem = () => {

    const { user } = useUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center text-sm p-3 w-full hover:bg-primary/5 ">
                    <div className="gap-x-2 flex items-center max-w-[150px]">
                        <Avatar className="size-6">
                            <AvatarImage src={user?.imageUrl} />
                            <AvatarFallback>
                                {user?.firstName?.charAt(0)}
                                {user?.lastName?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-start font-medium line-clamp-1">
                            {user?.firstName} {user?.lastName}
                        </span>
                        <ChevronsUpDownIcon className="ml-2 text-muted-foreground size-4" />
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="start" alignOffset={11} forceMount>
                <div className="flex flex-col space-y-4 p-2">
                    <p className="text-xs font-medium leading-none text-muted-foreground">
                        {user?.emailAddresses[0].emailAddress}
                    </p>
                    <div className="flex items-center gap-x-2">
                        <div className="rounded-md bg-secondary p-1">
                            <Avatar>
                                <AvatarImage src={user?.imageUrl} />
                                <AvatarFallback>
                                    {user?.firstName?.charAt(0)}
                                    {user?.lastName?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm line-clamp-1">
                                {user?.fullName}
                            </p>
                        </div>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="w-full cursor-pointer text-destructive">
                    <SignOutButton>
                        Sair
                    </SignOutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    );
};