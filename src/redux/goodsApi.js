import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

function providesList(resultsWithIds, tagType) {
	return resultsWithIds
		? [
			{type: tagType, id: 'LIST'},
			...resultsWithIds.map(({id}) => ({type: tagType, id})),
		]
		: [{type: tagType, id: 'LIST'}];
}

export const goodsApi = createApi({
	reducerPath: 'goodsApi',
	tagTypes: ['Goods', 'User', 'Categories'],
	baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4447/'}),
	endpoints: (build) => ({
		getGoods: build.query({
			query: (body) =>
				body.search === ''
					? `/products?category_like=${body.category}&_start=0&_end=${body.limit}`
					: `/products?title_like=${body.search}`,
			providesTags: (result) => providesList(result, 'Goods'),
		}),
		
		getSingleGoods: build.query({
			query: (id) => `/products/${id}`,
			providesTags: (result) =>
				result ? [result, {type: 'Goods'}] : [{type: 'Goods'}],
		}),
		
		changeSingleGoods: build.mutation({
			query: (body) => ({
				url: `/products/${body.idGoods}`,
				method: 'PATCH',
				body: {
					title: body.newTitle,
					price: body.newPrice,
					description: body.newDescription,
					category: body.newCategory,
					images: body.newImages
				},
			}),
			invalidatesTags: [{type: 'Goods'}],
		}),
		
		addGoods: build.mutation({
			query: (body) => ({
				url: `/products`,
				method: 'POST',
				body: {
					title: body.title,
					price: body.price,
					description: body.description,
					category: body.category,
					images: body.images,
				},
			}),
			invalidatesTags: [{type: 'Goods'}],
		}),
		deleteGoods: build.mutation({
			query: (id) => ({
				url: `/products/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: [{type: 'Goods'}],
		}),
		getCategory: build.query({
			query: () => `/categories`,
			providesTags: (result) => providesList(result, 'Categories'),
		}),
		
		addCategories: build.mutation({
			query: (body) => ({
				url: `/categories`,
				method: 'POST',
				body: {
					name: body.name,
					visibleName: body.visibleName,
					image: body.image,
				},
			}),
			invalidatesTags: [{type: 'Categories'}],
		}),
		getReviews: build.query({
			query: () => '/reviews',
			providesTags: (result) => providesList(result, 'Reviews'),
		}),
		addReview: build.mutation({
			query: (body) => ({
				url: '/reviews',
				method: 'POST',
				body: {
					name: body.name,
					title: body.title,
					rating: body.rating,
					comment: body.comment,
				}
			}),
			invalidatesTags: [{type: 'Reviews'}],
		}),
		
		
		deleteReview: build.mutation({
			query: (id) => ({
				url: `/reviews/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: [{type: 'Reviews'}],
		}),
		getUsers: build.query({
			query: () => `/users`,
			providesTags: (result) => providesList(result, 'User'),
		}),
		
		getSingleUser: build.query({
			query: (id) => `/users/${id}`,
			providesTags: (result) =>
				result ? [result, {type: 'User'}] : [{type: 'User'}],
		}),
		
		addUser: build.mutation({
			query: (body) => ({
				url: `/users`,
				method: 'POST',
				body: {
					email: body.email,
					password: body.password,
					name: body.name,
					role: body.role,
					avatar: body.avatar,
					basket: {
						item: []
					},
					history: {}
				},
			}),
			// invalidatesTags: (result, error, arg) => [{type: 'User', id: arg.id}]
			invalidatesTags: [{type: 'User'}],
		}),
		removeUser: build.mutation({
			query: (id) => ({
				url: `/users/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: [{type: 'User'}],
		}),
		addGoodsInBasket: build.mutation({
			query: (body) => ({
				url: `/users/${body.id}`,
				method: 'PATCH',
				body: {
					basket: {
						item: body.data,
					},
					GeneralsumInBasket: body.sum,
				},
			}),
			// invalidatesTags: (result, error, arg) => [{type: 'User', id: arg.id}]
			invalidatesTags: [{type: 'User'}],
		}),
		
		removeGoodsInBasket: build.mutation({
			query: (body) => ({
				url: `/users/${body.id}`,
				method: 'PATCH',
				body: {
					basket: {
						item: body.data,
					},
					GeneralsumInBasket: body.sum,
				},
			}),
			invalidatesTags: [{type: 'User'}],
		}),
		
		incrementGoodsInBasket: build.mutation({
			query: (body) => ({
				url: `/users/${body.idUser}`,
				method: 'PATCH',
				body: {
					basket: {
						item: body.item,
					},
					GeneralsumInBasket: body.generalSum,
				},
			}),
			invalidatesTags: [{type: 'User'}],
		}),
		
		confirmDiliveryBasket: build.mutation({
			query: (body) => ({
				url: `/users/${body.idUser}`,
				method: 'PATCH',
				body: {
					basket: {
						item: body.item,
					},
					GeneralsumInBasket: body.generalSum,
					history: body.history,
				},
			}),
			invalidatesTags: [{type: 'User'}],
		}),
	}),
});

export const {
	useGetGoodsQuery,
	useGetSingleGoodsQuery,
	useGetUsersQuery,
	useGetSingleUserQuery,
	useRemoveUserMutation,
	useGetReviewsQuery,
	useAddReviewMutation,
	useDeleteReviewMutation,
	useAddGoodsInBasketMutation,
	useRemoveGoodsInBasketMutation,
	useIncrementGoodsInBasketMutation,
	useConfirmDiliveryBasketMutation,
	useGetCategoryQuery,
	useChangeSingleGoodsMutation,
	useAddCategoriesMutation,
	useAddGoodsMutation,
	useDeleteGoodsMutation,
	useAddUserMutation,
} = goodsApi;
