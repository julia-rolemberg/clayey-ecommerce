import express = require("express");
import multer = require("multer");
import fs = require("fs");
import FS = require("./fs");

export = class Upload {
	public static async gravarArquivo(arquivo: any, caminhoRelativoPasta: string, nomeArquivo: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			let caminhoAbsolutoArquivo: string;
			try {
				caminhoAbsolutoArquivo = FS.gerarCaminhoAbsolutoArquivo(caminhoRelativoPasta, nomeArquivo);
			} catch (e) {
				reject("Caminho inválido!");
				return;
			}

			fs.writeFile(caminhoAbsolutoArquivo, arquivo.buffer, (err) => {
				if (err)
					reject(err);
				else
					resolve();
			});
		});
	}

	public static async criarArquivoVazio(caminhoRelativoPasta: string, nomeArquivo: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			let caminhoAbsolutoArquivo: string;
			try {
				caminhoAbsolutoArquivo = FS.gerarCaminhoAbsolutoArquivo(caminhoRelativoPasta, nomeArquivo);
			} catch (e) {
				reject("Caminho inválido!");
				return;
			}

			try {
				fs.exists(caminhoAbsolutoArquivo, (exists) => {
					if (exists) {
						reject("Arquivo já existe!");
						return;
					}

					fs.writeFile(caminhoAbsolutoArquivo, [], (err) => {
						if (err)
							reject(err);
						else
							resolve();
					});
				});
			} catch (e) {
				reject(e);
			}
		});
	}

	public static async adicionarAoFinalDoArquivo(arquivo: any, caminhoRelativoPasta: string, nomeArquivo: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			let caminhoAbsolutoArquivo: string;
			try {
				caminhoAbsolutoArquivo = FS.gerarCaminhoAbsolutoArquivo(caminhoRelativoPasta, nomeArquivo);
			} catch (e) {
				reject("Caminho inválido!");
				return;
			}

			try {
				fs.exists(caminhoAbsolutoArquivo, (exists) => {
					if (!exists) {
						reject("Arquivo inexistente!");
						return;
					}

					fs.appendFile(caminhoAbsolutoArquivo, arquivo.buffer, (err) => {
						if (err)
							reject(err);
						else
							resolve();
					});
				});
			} catch (e) {
				reject(e);
			}
		});
	}
};
