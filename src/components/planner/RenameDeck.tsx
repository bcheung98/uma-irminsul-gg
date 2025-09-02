import { useState, BaseSyntheticEvent } from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import SearchBar from "custom/SearchBar";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, IconButton, Button } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CloseIcon from "@mui/icons-material/Close";

// Helper imports
import { useAppDispatch } from "helpers/hooks";
import { renameDeck } from "reducers/planner";

function RenameDeck({
    name,
    handleClose,
}: {
    name: string;
    handleClose: () => void;
}) {
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const [inputValue, setInputValue] = useState(name);
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setInputValue(event.target.value);
    };

    const handleClickRename = () => {
        dispatch(renameDeck(inputValue));
        handleClose();
    };

    const handleClickCancel = () => {
        handleClose();
    };

    return (
        <MainContentBox
            title="Rename Deck"
            actions={
                <IconButton
                    disableRipple
                    onClick={handleClose}
                    sx={{ color: theme.appbar.color }}
                >
                    <CloseIcon />
                </IconButton>
            }
            contentProps={{ padding: 2 }}
        >
            <SearchBar
                placeholder={name}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(event: React.KeyboardEvent) => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        handleClickRename();
                    }
                }}
                inputIcon={<DriveFileRenameOutlineIcon />}
                size={{ height: "40px" }}
            />
            <FlexBox
                sx={{
                    justifyContent: "right",
                    flexWrap: "wrap",
                    rowGap: "8px",
                    columnGap: "16px",
                    mt: "16px",
                }}
            >
                <Button
                    onClick={handleClickCancel}
                    variant="contained"
                    color="error"
                    disableElevation
                    disableRipple
                    sx={{ height: "32px" }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleClickRename}
                    variant="contained"
                    color="info"
                    disableElevation
                    disableRipple
                    sx={{ height: "32px" }}
                >
                    Rename
                </Button>
            </FlexBox>
        </MainContentBox>
    );
}

export default RenameDeck;
