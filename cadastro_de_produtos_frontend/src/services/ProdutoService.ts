
import { apiPost } from "../api/api";

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