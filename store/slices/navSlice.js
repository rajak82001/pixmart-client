import {createSlice} from "@reduxjs/toolkit";

const navSlice = createSlice({
    name: "nav",
    initialState: {
        sidebar: false,
        tab: "photos-purchased",
    },
    reducers : {
        toggleSidebar : (state) => {
            state.sidebar = !state.sidebar;
        },
        setTab : (state, action) => {
            state.tab = action.payload;
        },
    },
});

export const { toggleSidebar, setTab } = navSlice.actions;
export default navSlice.reducer;