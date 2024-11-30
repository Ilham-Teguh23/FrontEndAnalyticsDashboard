import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
    'data/fetchData',
    async ({ page = 1, limit = 10, paymentType, fareAmount, tripDistance }, thunkAPI) => {
        try {
            const filters = {}
            if (paymentType) filters.paymentType = paymentType
            if (fareAmount) filters.fareAmount = fareAmount
            if (tripDistance) filters.tripDistance = tripDistance

            let url = `${process.env.REACT_APP_API_URL}/route-maps?page=${page}&limit=${limit}`

            if (Object.keys(filters).length > 0) {
                const queryParams = new URLSearchParams(filters).toString()
                url += `&${queryParams}`
            }

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Gagal Untuk Mendapatkan Data");
            }

            console.log(url);
            

            return {
                items: data.data,
                totalItems: data.total,
                currentPage: data.page,
                totalPages: data.lastPage
            };
        } catch (error) {
            return thunkAPI.rejectWithValue('Gagal Untuk Mendapatkan Data')
        }
    }
);

export const fetchRouteData = createAsyncThunk(
    'data/fetchRouteData',
    async (id, thunkAPI) => {

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/route-maps/${id}/show`);
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Gagal Untuk Mendapatkan Data");
            }

            return data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Gagal')
        }
    }
);

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        items: [],
        totalItems: 0,
        currentPage: 1,
        totalPages: 1,
        routeData: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.totalItems = action.payload.totalItems;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchRouteData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRouteData.fulfilled, (state, action) => {
                state.loading = false;
                state.routeData = action.payload
            })
            .addCase(fetchRouteData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default dataSlice.reducer;
