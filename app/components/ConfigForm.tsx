"use client";

import React from "react";

interface ConfigFormProps {
  prefix: string;
  collectionName: string;
  onChange: (key: "prefix" | "collectionName", value: string) => void;
}

export default function ConfigForm({
  prefix,
  collectionName,
  onChange,
}: ConfigFormProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
      <div className="w-full">
        <label htmlFor="prefix" className="block text-xs font-semibold tracking-wider text-zinc-500 mb-2">
          PREFIX
        </label>
        <input
          type="text"
          name="prefix"
          id="prefix"
          className="input font-mono"
          placeholder="e.g. icon"
          value={prefix}
          onChange={(e) => onChange("prefix", e.target.value)}
        />
        <p className="mt-2 text-xs text-zinc-600">
          e.g. "mdi" or "custom"
        </p>
      </div>

      <div className="w-full">
        <label htmlFor="collectionName" className="block text-xs font-semibold tracking-wider text-zinc-500 mb-2">
          COLLECTION NAME
        </label>
        <input
          type="text"
          name="collectionName"
          id="collectionName"
          className="input font-mono"
          placeholder="Optionally set collection name"
          value={collectionName}
          onChange={(e) => onChange("collectionName", e.target.value)}
        />
        <p className="mt-2 text-xs text-zinc-600">
          For JSON metadata
        </p>
      </div>
    </div>
  );
}
