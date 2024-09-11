
export interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    nickname: any;
    base_experience: number;
    sprites: {
        front_default: string;
    };
    moves: [{
        move: {
            name: string;
            url: string;
        },
        version_group_details: [any]

    }];
    types: [{
        slot: number,
        type: {
            name: string;
            url: string;
        }
    }]

}

export interface UserLogin {
    username: string;
    isAuthenticated: boolean;
    myPokemonList: PokemonDetails[];

}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}