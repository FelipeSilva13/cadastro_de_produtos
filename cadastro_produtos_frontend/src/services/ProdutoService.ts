import axios from "axios";
import api, { apiPost } from "../api/api";

const API_URL = "http://localhost:8080/produtos";

export async function criarProduto(dados: any, imagem: string | Blob) {

    const formData = new FormData();

    formData.append(
        "produto",
        new Blob(
            [JSON.stringify(dados)],
            { type: "application/json" }
        )
    );

    formData.append("imagem", imagem);

    return apiPost("/produtos", formData);
}