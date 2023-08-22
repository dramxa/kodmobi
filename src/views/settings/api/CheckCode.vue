<template>
  <div>
    <div class="px-4 py-6 text-base font-bold">
        <span class="text-green-500 pr-2">GET</span> <span>Check Code</span>
    </div>
    <div class="mx-4 py-1.5 px-2.5 text-xs rounded-[3px] border border-gray-200 bg-gray-50">https://api.kod.mobi/api/v2/message/check?session_id=&code=7032</div>
    <div class="mx-4 mt-8 text-sm">
        <div class="border-b border-gray-200">
            <span class="font-bold pr-2">AUTHORIZATION</span> <span class="text-gray-500">API Key</span>
        </div>
        <div class="grid grid-cols-12 mt-2.5 text-xs">
            <div class="col-span-3 font-bold">Key</div>
            <div class="col-span-9">x-api-key</div>
        </div>
        <div class="grid grid-cols-12 mt-2.5 text-xs">
            <div class="col-span-3 font-bold">Value</div>
            <div class="col-span-9">1e78ea49-9f37-40a0-8489-6d82c300ac71</div>
        </div>
        <div class="border-b border-gray-200 mt-4">
            <span class="font-bold pr-2">HEADERS</span>
        </div>
        <div class="grid grid-cols-12 mt-2.5 text-xs">
            <div class="col-span-3 font-bold">Accept</div>
            <div class="col-span-9">application/json</div>
        </div>
        <div class="grid grid-cols-12 mt-2.5 text-xs">
            <div class="col-span-3 font-bold">Content-Type</div>
            <div class="col-span-9">application/json</div>
        </div>
        <div class="border-b border-gray-200 mt-4">
            <span class="font-bold pr-2">PARAMS</span>
        </div>
        <div class="grid grid-cols-12 mt-2.5 text-xs">
            <div class="col-span-3 font-bold">session_id</div>
            <div class="col-span-9"></div>
        </div>
        <div class="grid grid-cols-12 mt-2.5 text-xs">
            <div class="col-span-3 font-bold">code</div>
            <div class="col-span-9">7032</div>
        </div>
    </div>
    <div class="m-4 mt-8 p-4 bg-gray-700 rounded-lg text-xs" style="font-family: monospace;">
        <span class="text-white">curl --location --request </span>
        <span class="text-rose-500">GET </span>
        <span class="text-green-500">'https://api.kod.mobi/api/v2/message/check?session_id=&code=7032' </span>
        <span class="text-white">\ </span>
        <br />
        <span class="text-white">--header </span>
        <span class="text-green-500">'Accept: application/json' </span>
        <span class="text-white">\ </span>
        <br />
        <span class="text-white">--header </span>
        <span class="text-green-500">'Content-Type: application/json' </span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>