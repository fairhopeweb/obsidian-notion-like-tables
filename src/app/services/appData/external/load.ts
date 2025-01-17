import { NltSettings } from "../../settings";
import NltPlugin from "main";
import { findCurrentViewType, parseTableFromEl } from "./loadUtils";
import { updateAppDataFromSavedState } from "./merge";
import {
	hasValidHeaderRow,
	hasValidTypeDefinitionRow,
	hasValidRowIds,
	hasValidColumnIds,
} from "../../string/validators";
import { DEBUG } from "src/app/constants";
import { appDataToMarkdown, findAppData } from "./saveUtils";
import { findTableId } from "./saveUtils";
import { LoadedData } from "../state/loadedData";
import { appDataIdsToMarkdown, appDataTypesToMarkdown } from "../debug";

/**
 * Loads app data
 * @param el The root table element
 * @returns AppData - The loaded data which the app will use to initialize its state
 */
export const loadAppData = async (
	plugin: NltPlugin,
	settings: NltSettings,
	el: HTMLElement,
	sourcePath: string
): Promise<LoadedData> => {
	const parsedTable = parseTableFromEl(el);
	if (DEBUG.LOAD_APP_DATA.PARSED_TABLE) {
		console.log("[load][loadAppData]: parsedTableFromEl");
		console.log(parsedTable);
	}

	const tableId = findTableId(parsedTable);
	let isValidTable = true;
	if (!tableId) {
		console.log("NLT: Invalid table id");
		isValidTable = false;
	} else if (!hasValidHeaderRow(parsedTable)) {
		console.log(`NLT: Invalid header row in ${tableId}`);
		isValidTable = false;
	} else if (!hasValidTypeDefinitionRow(parsedTable)) {
		console.log(`NLT: Invalid type definition row in ${tableId}`);
		isValidTable = false;
	} else if (!hasValidColumnIds(parsedTable)) {
		console.log(`NLT: Invalid column ids in ${tableId}`);
		isValidTable = false;
	} else if (!hasValidRowIds(parsedTable)) {
		console.log(`NLT: Invalid row ids in ${tableId}`);
		isValidTable = false;
	}

	if (!isValidTable) {
		return { tableId: null, data: null };
	}

	//Migration from 3.4.0
	if (settings.appData[sourcePath]) {
		if (settings.appData[sourcePath][tableId]) {
			const data = settings.appData[sourcePath][tableId];
			settings.state[sourcePath] = {};
			settings.state[sourcePath][tableId] = {
				data,
				viewType: "live-preview",
				shouldUpdate: false,
			};
			delete settings.appData[sourcePath][tableId];
			await plugin.saveSettings();
		}
	}

	const viewType = findCurrentViewType(el);
	if (settings.state[sourcePath]) {
		if (settings.state[sourcePath][tableId]) {
			if (settings.state[sourcePath][tableId].data) {
				const oldData = settings.state[sourcePath][tableId].data;
				if (DEBUG.LOAD_APP_DATA.DATA) {
					console.log("[load]: loadAppData");
					console.log("Loading from cache.");
					console.log(`Table: ${tableId}, View: ${viewType}`);
					console.log(oldData);
				}

				const data = findAppData(parsedTable);
				const updated = updateAppDataFromSavedState(oldData, data);
				if (DEBUG.LOAD_APP_DATA.IDS)
					console.log(appDataIdsToMarkdown(tableId, data));
				if (DEBUG.LOAD_APP_DATA.TYPES)
					console.log(appDataTypesToMarkdown(tableId, data));
				if (DEBUG.LOAD_APP_DATA.MARKDOWN)
					console.log(appDataToMarkdown(tableId, data));
				return { tableId, data: updated };
			}
		}
	}

	const data = findAppData(parsedTable);
	if (DEBUG.LOAD_APP_DATA.DATA) {
		console.log("[load]: loadAppData");
		console.log("Loading new.");
		console.log(`Table: ${tableId}, View: ${viewType}`);
		console.log(data);
	}

	if (DEBUG.LOAD_APP_DATA.IDS)
		console.log(appDataIdsToMarkdown(tableId, data));
	if (DEBUG.LOAD_APP_DATA.TYPES)
		console.log(appDataTypesToMarkdown(tableId, data));
	if (DEBUG.LOAD_APP_DATA.MARKDOWN)
		console.log(appDataToMarkdown(tableId, data));

	//When a user adds a new table, this entry will initially be null, we need to set this
	//so a user can add rows/columns via hotkeys
	settings.state[sourcePath] = {};
	settings.state[sourcePath][tableId] = {
		data,
		shouldUpdate: false,
		viewType: findCurrentViewType(el),
	};
	await plugin.saveSettings();
	return { tableId, data };
};
