import { NextRequest, NextResponse } from "next/server";
import formidable, { IncomingForm, Fields, Files } from "formidable";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { IncomingMessage } from "http";

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), "/uploaded");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

interface CaseUploadResponse {
  success: boolean;
  fields?: Fields;
  files?: Files;
  error?: any;
}

function createMockRequest(stream: Readable, headers: Headers): IncomingMessage {
  const req = Object.assign(stream, {
    headers: Object.fromEntries(headers.entries()),
    method: "POST",
    url: "",
  });
  return req as IncomingMessage;
}

export async function POST(req: NextRequest): Promise<NextResponse<CaseUploadResponse>> {
  const buffer = Buffer.from(await req.arrayBuffer());
  const stream = Readable.from(buffer);
  const mockReq = createMockRequest(stream, req.headers);

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    multiples: false,
  });

  return new Promise((resolve, reject) => {
    form.parse(mockReq, (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        reject(NextResponse.json({ success: false, error: err }));
      } else {
        resolve(NextResponse.json({ success: true, fields, files }));
      }
    });
  });
}